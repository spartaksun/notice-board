<?php
/**
 * Image upload service
 * 
 * Created by A.Belyakovskiy.
 * Date: 6/23/16
 * Time: 6:27 PM
 */

namespace AppBundle\Services;


use AppBundle\Entity\NoticeImage;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageUploader
{
    /**
     * @var ContainerInterface
     */
    private $container;
    /**
     * @var string
     */
    private $directoryToSave;

    /**
     * @var array
     */
    private $sizeAliases = ['big', 'small'];

    /**
     * ImageUploader constructor.
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
        $this->directoryToSave = $this->container->getParameter('image_uploader.path');
    }

    /**
     * @param UploadedFile $originFile
     * @param string $prefix
     * @return NoticeImage
     */
    public function resizeAndSaveImage(UploadedFile $originFile, $prefix)
    {
        $im = new \Imagick();
        $im->readImage($originFile->getRealPath());

        $format = strtolower($im->getImageFormat());
        $imageKey = $prefix . DIRECTORY_SEPARATOR . md5(microtime(true));

        $dirName = $this->directoryToSave . DIRECTORY_SEPARATOR . $prefix;
        if (!is_dir($dirName)) {
            mkdir($dirName, 0775, true);
        }

        foreach ($this->sizeAliases as $alias) {
            $path = $this->makeImagePath($imageKey, $format, $alias);
            $this->resizeImage($im, $path, $alias);
        }

        $noticeImage = new NoticeImage();
        $noticeImage->setFileKey($imageKey);
        $noticeImage->setFormat($format);

        return $noticeImage;
    }

    /**
     * @param NoticeImage $image
     * @return bool
     */
    public function deleteImage(NoticeImage $image)
    {
        $result = true;

        foreach ($this->sizeAliases as $alias) {
            $path = $this->makeImagePath($image->getFileKey(), $image->getFormat(), $alias );
            $realPath = $this->makeFullImagePath($path);
            if(is_file($realPath)) {
                if(is_writeable($realPath)) {
                    $result = $result && unlink($realPath);
                } else {
                    $result = false;
                }
            }
        }

        return $result;
    }

    /**
     * @param $imageKey
     * @param $format
     * @param $size
     * @return string
     */
    private function makeImagePath($imageKey, $format, $size)
    {
        return $imageKey . '.' . $size . '.' . $format;
    }

    /**
     * @param \Imagick $imagick
     * @param $path
     * @param $alias
     */
    private function resizeImage(\Imagick $imagick, $path, $alias)
    {
        $width = $this->container->getParameter('image_uploader.size.'.$alias.'.width');
        $height = $this->container->getParameter('image_uploader.size.'.$alias.'.height');

        $imagick->cropThumbnailImage($width,$height);

        file_put_contents(
            $this->makeFullImagePath($path),
            $imagick->getimageblob()
        );
    }

    private function makeFullImagePath($path)
    {
        return $this->directoryToSave . DIRECTORY_SEPARATOR . $path;
    }
}
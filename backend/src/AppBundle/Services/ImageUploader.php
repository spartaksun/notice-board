<?php
/**
 * Image upload service
 * 
 * Created by A.Belyakovskiy.
 * Date: 6/23/16
 * Time: 6:27 PM
 */

namespace AppBundle\Services;


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
     * @return array
     */
    public function resizeAndSaveImage(UploadedFile $originFile, $prefix = '')
    {
        $im = new \Imagick();
        $im->readImage($originFile->getRealPath());

        $format = strtolower($im->getImageFormat());
        $imageKey = $prefix . DIRECTORY_SEPARATOR . md5(microtime(true));

        $dirName = $this->directoryToSave . DIRECTORY_SEPARATOR . $prefix;
        if (!is_dir($dirName)) {
            mkdir($dirName, 0775, true);
        }

        foreach (['big', 'small'] as $alias) {
            $path = $this->makeImagePath($imageKey, $format, $alias);
            $this->resizeImage($im, $path, $alias);
        }

        return [
            'key' => $imageKey,
            'format' => $format
        ];
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

//        $imagick->setImageCompressionQuality(100);
//        $imagick->cropThumbnailImage($newMaximumWidth, $newMaximumHeight);
////        $imagick->resizeImage(0, $newMaximumHeight, \Imagick::FILTER_LANCZOS,1);

        file_put_contents(
            $this->directoryToSave . DIRECTORY_SEPARATOR . $path,
            $imagick->getimageblob()
        );
    }
}
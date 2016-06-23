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

        $this->resizeImage($prefix, $im, $imageKey, $format, 'small');
        $this->resizeImage($prefix, $im, $imageKey, $format, 'big');

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
    public function makeImagePath($imageKey, $format, $size)
    {
        return $imageKey . '.' . $size . '.' . $format;
    }

    /**
     * @param $prefix
     * @param $imagick
     * @param $imageKey
     * @param $format
     */
    private function resizeImage($prefix, \Imagick $imagick, $imageKey, $format, $alias)
    {
        $imagick->thumbnailImage(
            $this->container->getParameter('image_uploader.size.'.$alias.'.width'),
            $this->container->getParameter('image_uploader.size.'.$alias.'.height'), true);

        $dirName = $this->directoryToSave . DIRECTORY_SEPARATOR . $prefix;
        if (!is_dir($dirName)) {
            mkdir($dirName, 0775, true);
        }
        file_put_contents(
            $this->directoryToSave . DIRECTORY_SEPARATOR . $this->makeImagePath($imageKey, $format, $alias),
            $imagick->getimageblob()
        );
    }
}
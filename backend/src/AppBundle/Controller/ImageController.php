<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/23/16
 * Time: 8:18 PM
 */

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Temporary controller for receiving images
 * 
 * @package AppBundle\Controller
 */
class ImageController extends Controller
{
    /**
     * @Route("/{username}/{image}", name="images")
     * @Method("GET")
     */
    public function indexAction($image, $username)
    {
        // TODO Return static content using NGINX!
        
        $filePath = $this->getParameter('image_uploader.path')
            . DIRECTORY_SEPARATOR
            . $username
            . DIRECTORY_SEPARATOR
            . $image;

        if(file_exists($filePath)) {
            return new BinaryFileResponse($filePath);
        }

        throw new NotFoundHttpException;
    }
}
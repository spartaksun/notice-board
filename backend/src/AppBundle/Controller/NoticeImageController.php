<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 7/3/16
 * Time: 7:49 PM
 */

namespace AppBundle\Controller;


use AppBundle\AppException;
use AppBundle\Entity\Notice;
use AppBundle\Entity\NoticeImage;
use AppBundle\Entity\User;
use FOS\RestBundle\Controller\Annotations\FileParam;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcher;
use phpDocumentor\Reflection\Types\This;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class NoticeImageController extends FOSRestController
{

    /**
     * @FileParam(name="image", image=true,  requirements={
     *     "maxSize"="200m",
     *     "minWidth"="250",
     *     "minHeight"="150"
     * })
     * @RequestParam(name="notice_id")
     * @param ParamFetcher $paramFetcher
     * @return Response
     * @throws AppException
     */
    public function postNoticeImageAction(ParamFetcher $paramFetcher)
    {
        $image = $paramFetcher->get("image");
        if (empty($image)) {
            throw new HttpException('Image not found');
        }

        $user = $this->loadUser();
        $noticeImage = $this->get('app.image.uploader')
            ->resizeAndSaveImage($image, $user->getUsername());
        
        $noticeId = $paramFetcher->get("notice_id");
        if (!empty($noticeId)) {
            $notice = $this->getDoctrine()
                ->getRepository('AppBundle:Notice')
                ->find($noticeId);

            if (empty($notice)) {
                throw new NotFoundHttpException(sprintf('Notice %s not found', $noticeId));
            }
            if ($notice->getUser() != $user) {
                throw new AppException('Not allowed');
            }

            $noticeImage->setNotice($notice);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($noticeImage);
        $em->flush();

        return $this->handleView($this->view($noticeImage));
    }

    /**
     * @param Notice $notice
     * @param NoticeImage $noticeImage
     * @return Response
     * @throws AppException
     * @ParamConverter("noticeImage", class="AppBundle:NoticeImage")
     * @ParamConverter("notice", class="AppBundle:Notice")
     */
    public function deleteNoticeImageAction(Notice $notice, NoticeImage $noticeImage)
    {
        $user = $this->loadUser();
        $images = $notice->getImages();

        if (!$images->contains($noticeImage)) {
            throw new AppException('Invalid arguments');
        }

        if ($user !== $notice->getUser()) {
            throw new AccessDeniedHttpException;
        }

        $success = $this->get('app.image.uploader')->deleteImage($noticeImage);
        if(!$success){
            throw new AppException('Can not delete file');
        }
        
        $em = $this->getDoctrine()->getEntityManager();
        $em->remove($noticeImage);
        $em->flush();


        return $this->handleView($this->view($noticeImage));
    }

    /**
     * @return User
     */
    private function loadUser()
    {
        return $this->get('security.token_storage')
            ->getToken()
            ->getUser();
    }
}
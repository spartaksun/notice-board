<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/30/16
 * Time: 8:57 PM
 */

namespace AppBundle\Controller;

use AppBundle\AppException;
use AppBundle\Entity\Notice;
use AppBundle\Entity\NoticeImage;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\FileParam;

use FOS\RestBundle\Request\ParamFetcher;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Validator\Constraints as Assert;

class NoticeController extends FOSRestController
{
    /**
     *
     * @QueryParam(name="category", requirements="\d+", description="Category ID.")
     * @QueryParam(name="username", description="User username.")
     *
     * @param ParamFetcher $paramFetcher
     *
     * @return Response
     */
    public function getNoticesAction(ParamFetcher $paramFetcher)
    {
        $notices = $this->getDoctrine()
            ->getRepository('AppBundle:Notice')
            ->findByParams($paramFetcher->all());

        $view = $this->view($notices, 200);

        return $this->handleView($view);
    }

    /**
     * @param Notice $notice
     * @ParamConverter("notice", class="AppBundle:Notice")
     * @return Response
     */
    public function getNoticeAction(Notice $notice)
    {
        $view = $this->view($notice);

        return $this->handleView($view);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function postNoticeAction(Request $request)
    {
        $user = $this->get('security.token_storage')
            ->getToken()
            ->getUser();

        $notice = $this->get('app.notice.creator')
            ->create($request, $user);

        return $this->handleView($this->view($notice));
    }

    /**
     * @FileParam(name="image", image=true,  requirements={
     *     "mimeTypes"="image/jpeg",
     *     "maxSize"="200m",
     *     "minWidth"="250",
     *     "minHeight"="150"
     * })
     * @RequestParam(name="notice_id", requirements="\d+")
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

        $user = $this->get('security.token_storage')
            ->getToken()
            ->getUser();

        $imageParams = $this->get('app.image.uploader')
            ->resizeAndSaveImage($image, $user->getUsername());

        $noticeImage = new NoticeImage();
        $noticeImage->setFileKey($imageParams['key']);
        $noticeImage->setFormat($imageParams['format']);

        $noticeId = $paramFetcher->get("notice_id");
        if (!empty($noticeId)) {
            $notice = $this->getDoctrine()
                ->getRepository('AppBundle:Notice')
                ->find($noticeId);

            if (empty($notice)) {
                throw new NotFoundHttpException('Notice not found');
            }
            if ($notice->getUser() != $user) {
                throw new AppException('Not allowed');
            }

            $noticeImage->setNotice($notice);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($noticeImage);
        $em->flush();

        $response = $this->handleView($this->view($noticeImage));

        return $response;
    }

}
<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/30/16
 * Time: 8:57 PM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Notice;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Request\ParamFetcher;

class NoticeController extends FOSRestController
{
    /**
     *
     * @QueryParam(name="category", requirements="\d+", description="Category ID.")
     * @QueryParam(name="username", description="User username.")
     *
     * @param ParamFetcher $paramFetcher
     *
     * @return \AppBundle\Entity\Notice[]|array
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
     * @return Notice
     */
    public function getNoticeAction(Notice $notice)
    {
        $view = $this->view($notice);

        return $this->handleView($view);
    }

    /**
     * @param Request $request
     * @return \AppBundle\Entity\Notice|mixed|\Symfony\Component\Form\FormInterface
     */
    public function postNoticeAction(Request $request)
    {
        $user = $this->get('security.token_storage')
            ->getToken()
            ->getUser();

        $notice = $this->get('app.notice.creator')
            ->create($request, $user);

        return $notice;
    }

}
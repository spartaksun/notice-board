<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/30/16
 * Time: 8:57 PM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Notice;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class NoticeController extends Controller
{
    /**
     *
     * @QueryParam(name="category", requirements="\d+", description="Category ID.")
     * @QueryParam(name="user", requirements="\d+", description="User ID.")
     *
     * @param ParamFetcher $paramFetcher
     *
     * @return \AppBundle\Entity\Notice[]|array
     */
    public function getNoticesAction(ParamFetcher $paramFetcher)
    {
        return $this->getDoctrine()->getRepository('AppBundle:Notice')
            ->findByParams($paramFetcher->all());
    }

    /**
     * @param Notice $notice
     * @ParamConverter("notice", class="AppBundle:Notice")
     * @return Notice
     */
    public function getNoticeAction(Notice $notice)
    {
        return $notice;
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
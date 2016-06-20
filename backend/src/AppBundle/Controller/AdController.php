<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/30/16
 * Time: 8:57 PM
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class AdController extends Controller
{
    /**
     *
     * @QueryParam(name="category", requirements="\d+", description="Category ID.")
     * @QueryParam(name="user", requirements="\d+", description="User ID.")
     *
     * @param ParamFetcher $paramFetcher
     *
     * @return \AppBundle\Entity\Ad[]|array
     */
    public function getAdsAction(ParamFetcher $paramFetcher)
    {
        return $this->getDoctrine()->getRepository('AppBundle:Ad')
            ->findByParams($paramFetcher->all());
    }

    /**
     * @param Request $request
     * @return \AppBundle\Entity\Ad|mixed|\Symfony\Component\Form\FormInterface
     */
    public function postAdAction(Request $request)
    {
        $user = $this->get('security.token_storage')
            ->getToken()
            ->getUser();

        $ad = $this->get('app.ad.creator')
            ->create($request, $user);
        
        return $ad;
    }

}
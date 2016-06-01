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

class AdController extends Controller
{
    /**
     *
     * @QueryParam(name="category", requirements="\d+", description="Category ID.")
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

}
<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/30/16
 * Time: 8:57 PM
 */

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AdController extends Controller
{
    public function getAdsAction()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Ad')
            ->findAll();
    }

}
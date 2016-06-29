<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/29/16
 * Time: 5:13 PM
 */

namespace AppBundle\Controller;


use FOS\RestBundle\Controller\FOSRestController;

class CityController extends FOSRestController
{
    public function getCitiesAction()
    {
        $cities = $this->getDoctrine()->getRepository('AppBundle:City')
            ->findAll();
        $view = $this->view($cities, empty($cities) ? 204 : 200);

        return $this->handleView($view);
    }
}
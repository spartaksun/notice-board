<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/1/16
 * Time: 2:56 PM
 */

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class CategoryController extends Controller
{
    public function getCategoriesAction()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Category')
            ->findAll();
    }
}
<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/1/16
 * Time: 2:56 PM
 */

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class CategoryController extends Controller
{
    public function getCategoriesAction()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Category')
            ->findAll();
    }
    
    public function getCategoryAction($categoryId)
    {
        return $this->getDoctrine()->getRepository('AppBundle:Category')
            ->findOneBy([
                'id' => $categoryId
            ]);
    }
}
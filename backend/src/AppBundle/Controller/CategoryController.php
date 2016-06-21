<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/1/16
 * Time: 2:56 PM
 */

namespace AppBundle\Controller;


use FOS\RestBundle\Controller\FOSRestController;

class CategoryController extends FOSRestController
{
    /**
     * List of categories
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getCategoriesAction()
    {
        $categories = $this->getDoctrine()
            ->getRepository('AppBundle:Category')
            ->findAll();
        $view = $this->view($categories, empty($categories) ? 204 : 200);

        return $this->handleView($view);
    }

    /**
     * One category
     *
     * @param $categoryId
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getCategoryAction($categoryId)
    {
        $category = $this->getDoctrine()
            ->getRepository('AppBundle:Category')
            ->findOneBy([
                'id' => $categoryId
            ]);

        return $this->handleView($this->view($category));
    }
}
<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/30/16
 * Time: 7:29 PM
 */

namespace AppBundle\Services;


use AppBundle\Entity\Notice;
use AppBundle\Form\NoticeType;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;

class NoticeEditor
{
    /**
     * @var FormFactoryInterface
     */
    private $formFactory;
    /**
     * @var ObjectManager
     */
    private $om;


    public function __construct(ObjectManager $om, FormFactoryInterface $formFactory)
    {
        $this->om = $om;
        $this->formFactory = $formFactory;
    }

    /**
     * @param Request $request
     * @return Notice|mixed|\Symfony\Component\Form\FormInterface
     */
    public function edit(Notice $notice, Request $request)
    {
        $form = $this->formFactory->create(new NoticeType(), $notice, ['method' => 'PATCH']);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $notice = $form->getData();
            /* @var $notice Notice */
            $notice->setUpdatedAt(new \DateTime());
            
            $this->om->persist($notice);
            $this->om->flush();

            return $notice;
        }

        return $form;
    }
}
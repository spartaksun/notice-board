<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/16/16
 * Time: 10:21 PM
 */

namespace AppBundle\Services;


use AppBundle\Entity\Notice;
use AppBundle\Entity\User;
use AppBundle\Form\NoticeType;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;

class NoticeCreator
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
     * @param User $user
     * @return Notice|mixed|\Symfony\Component\Form\FormInterface
     */
    public function create(Request $request, User $user)
    {
        $notice = new Notice();
        $form = $this->formFactory->create(new NoticeType(), $notice);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $notice = $form->getData();
            /* @var $notice Notice */
            $notice->setCreatedAt(new \DateTime());
            $notice->setStatus(Notice::STATUS_ACTIVE);
            $notice->setUser($user);

            $this->om->persist($notice);
            $this->om->flush();

            return $notice;
        }

        return $form;
    }
}
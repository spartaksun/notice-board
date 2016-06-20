<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/16/16
 * Time: 10:21 PM
 */

namespace AppBundle\Services;


use AppBundle\Entity\Ad;
use AppBundle\Entity\User;
use AppBundle\Form\AdType;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;

class AdCreator
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
     * @return Ad|mixed|\Symfony\Component\Form\FormInterface
     */
    public function create(Request $request, User $user)
    {
        $ad = new Ad();
        $form = $this->formFactory->create(new AdType(), $ad);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $ad = $form->getData();
            /* @var $ad Ad */
            $ad->setCreatedAt(new \DateTime());
            $ad->setStatus(Ad::STATUS_ACTIVE);
            $ad->setUser($user);

            $this->om->persist($ad);
            $this->om->flush();

            return $ad;
        }

        return $form;
    }
}
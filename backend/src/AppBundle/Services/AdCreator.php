<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/16/16
 * Time: 10:21 PM
 */

namespace AppBundle\Services;


use AppBundle\Entity\Ad;
use AppBundle\Form\AdType;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;

class AdCreator
{
    private $formFactory;
    private $om;


    public function __construct(ObjectManager $om, FormFactoryInterface $formFactory)
    {
        $this->om = $om;
        $this->formFactory = $formFactory;
    }

    public function create(Request $request)
    {
        $ad = new Ad();
        $form = $this->formFactory->create(new AdType(), $ad);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $ad = $form->getData();
            /* @var $ad Ad */
            $ad->setCreatedAt(new \DateTime());
            $ad->setStatus(Ad::STATUS_ACTIVE);

            $this->om->persist($ad);
            $this->om->flush();

            return $ad;
        }

        return $form;
    }
}
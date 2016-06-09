<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/8/16
 * Time: 2:22 PM
 */

namespace AppBundle\Services;


use AppBundle\AppException;
use AppBundle\Entity\User;
use AppBundle\Form\UserType;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserHandler
{

    private $formFactory;
    private $om;
    private $entityClass;
    private $repository;
    private $encoder;


    public function __construct(ObjectManager $om,
                                $entityClass,
                                FormFactoryInterface $formFactory,
                                UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->om = $om;
        $this->entityClass = $entityClass;
        $this->repository = $this->om->getRepository($this->entityClass);
        $this->formFactory = $formFactory;
        $this->encoder = $passwordEncoder;
    }

    public function get($id)
    {
        return $this->repository->find($id);
    }

    public function post(Request $request)
    {
        $user = new User();
        $form = $this->formFactory->create(new UserType(), $user);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $user = $form->getData();

            /* @var $user User */
            $user->setPassword($this->encoder->encodePassword($user, $user->getPlainPassword()));

            $this->om->persist($user);
            $this->om->flush();

            return $user;
        }

        return $form;
    }
}
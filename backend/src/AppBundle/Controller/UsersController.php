<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/29/16
 * Time: 12:28 PM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\View;


class UsersController extends FOSRestController
{

    /**
     * Users profile
     * @return mixed
     */
    public function getProfileAction()
    {
        $user = $this->get('security.token_storage')
            ->getToken()
            ->getUser();

        return $this->handleView($this->view($user));
    }

    /**
     * @param User $user
     * @ParamConverter("user", class="AppBundle:User")
     * @return User
     */
    public function getUserAction(User $user)
    {
        return $this->handleView($this->view($user));
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return User|mixed|string
     * @View()
     */
    public function postUserAction(\Symfony\Component\HttpFoundation\Request $request)
    {
        $user = $this->container->get('app.user_handler')->create($request);
        $statusCode = $user instanceof User ? 201 : 400;

        return $this->handleView($this->view($user, $statusCode));
    }
}
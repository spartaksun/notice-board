<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/29/16
 * Time: 12:28 PM
 */

namespace AppBundle\Controller;

use AppBundle\AppException;
use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\HttpFoundation\Response;


class UsersController extends Controller
{

    /**
     * Users profile
     * @return mixed
     */
    public function getProfileAction()
    {
        return $this->get('security.token_storage')->getToken()->getUser();
    }

    /**
     * @param User $user
     * @ParamConverter("user", class="AppBundle:User")
     * @return User
     */
    public function getUserAction(User $user)
    {
        return $user;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return User|mixed|string
     * @View()
     */
    public function postUserAction(\Symfony\Component\HttpFoundation\Request $request)
    {
        return $this->container->get('app.user_handler')->create($request);
    }
}
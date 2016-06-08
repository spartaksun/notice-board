<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/29/16
 * Time: 12:28 PM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\View;


class UsersController extends Controller
{
    /**
     * @return array
     * @View()
     */
    public function getUsersAction()
    {
        $users = $this->getDoctrine()->getRepository('AppBundle:User')
            ->findAll();

        return [
            'users' => $users
        ];
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
        
        try {
            $newPage = $this->container->get('app.user_handler')->post($request);

            return $newPage;

        } catch (\Exception $exception) {

            return $exception->getMessage();
        }
    }
}
<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/30/16
 * Time: 8:24 PM
 */

namespace AppBundle\DataFixtures\ORM;


use AppBundle\Entity\User;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadUsers extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{

    /**
     * @var ContainerInterface
     */
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }


    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $city = $manager->getRepository('AppBundle:City')
            ->findOneBy([]);


        $alice = new User();
        $alice->setUsername('alice');
        $alice->setEmail('alice@mail.com');
        $alice->setPassword('alicepassword');
        $alice->setCity($city);
        $alice->setPhone('09722233444');

        $alicePassword = $this->container->get('security.password_encoder')
            ->encodePassword($alice, 'password');
        
        $alice->setPassword($alicePassword);

        $bob = new User();
        $bob->setUsername('bob');
        $bob->setEmail('bob@mail.com');
        $bob->setCity($city);
        $bob->setPhone('09722233455');

        $bobPassword = $this->container->get('security.password_encoder')
            ->encodePassword($bob, 'password');

        $bob->setPassword($bobPassword);

        $manager->persist($alice);
        $manager->persist($bob);
        $manager->flush();
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 3;
    }
}
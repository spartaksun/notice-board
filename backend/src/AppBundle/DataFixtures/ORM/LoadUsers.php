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

class LoadUsers extends AbstractFixture implements OrderedFixtureInterface
{

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $alice = new User();
        $alice->setUsername('alice');
        $alice->setEmail('alice@mail.com');
        $alice->setPassword('alicepassword');

        $bob = new User();
        $bob->setUsername('bob');
        $bob->setEmail('bob@mail.com');
        $bob->setPassword('bobpassword');

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
        return 1;
    }
}
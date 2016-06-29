<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/29/16
 * Time: 4:30 PM
 */

namespace AppBundle\DataFixtures\ORM;


use AppBundle\Entity\City;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadCities extends AbstractFixture implements OrderedFixtureInterface
{

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $city = new City();
        $city->setName('Kiyv');

        $manager->persist($city);

        $city = new City();
        $city->setName('Dnipro');

        $manager->persist($city);

        $city = new City();
        $city->setName('Kharkiv');

        $manager->persist($city);
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
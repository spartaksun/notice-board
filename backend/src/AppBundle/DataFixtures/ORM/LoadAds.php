<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/30/16
 * Time: 7:59 PM
 */

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Ad;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadAds  extends AbstractFixture implements OrderedFixtureInterface
{

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $bob = $manager->getRepository('AppBundle:User')
            ->findOneBy([
                'username' => 'bob'
            ]);
        $category = $manager->getRepository('AppBundle:Category')
            ->findOneBy([]);

        $ad1 = new Ad();
        $ad1->setTitle('Ad one');
        $ad1->setCreatedAt(new \DateTime());
        $ad1->setDescription("Toss each side of the pumpkin seeds with one quarter cup of caviar.");
        $ad1->setUser($bob);
        $ad1->setStatus(Ad::STATUS_ACTIVE);
        $ad1->setCategory($category);

        $ad2 = new Ad();
        $ad2->setTitle('Ad two');
        $ad2->setCreatedAt(new \DateTime());
        $ad2->setDescription("Try mixing the ginger lassi pork butts with shredded vinegar and teriyaki, boilled.");
        $ad2->setUser($bob);
        $ad2->setStatus(Ad::STATUS_ACTIVE);
        $ad2->setCategory($category);

        $manager->persist($ad1);
        $manager->persist($ad2);
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
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
        $carCategory = $manager->getRepository('AppBundle:Category')
            ->findOneBy([
                'slug' => 'cars'
            ]);

        $ad1 = new Ad();
        $ad1->setTitle('Skoda A5');
        $ad1->setCreatedAt(new \DateTime());
        $ad1->setDescription("Toss each side of the pumpkin seeds with one quarter cup of caviar.");
        $ad1->setUser($bob);
        $ad1->setStatus(Ad::STATUS_ACTIVE);
        $ad1->setCategory($carCategory);

        $ad2 = new Ad();
        $ad2->setTitle('BMW X5');
        $ad2->setCreatedAt(new \DateTime());
        $ad2->setDescription("Try mixing the ginger lassi pork butts with shredded vinegar and teriyaki, boilled.");
        $ad2->setUser($bob);
        $ad2->setStatus(Ad::STATUS_ACTIVE);
        $ad2->setCategory($carCategory);

        $ad3 = new Ad();
        $ad3->setTitle('Nissan Note');
        $ad3->setCreatedAt(new \DateTime());
        $ad3->setDescription("Remember: squeezeed lobster tastes best when roasted in a bottle seasoned with vodka.");
        $ad3->setUser($bob);
        $ad3->setStatus(Ad::STATUS_ACTIVE);
        $ad3->setCategory($carCategory);

        $manager->persist($ad1);
        $manager->persist($ad2);
        $manager->persist($ad3);

        $instrumentCategory = $manager->getRepository('AppBundle:Category')
            ->findOneBy([
                'slug' => 'music'
            ]);

        $ad1 = new Ad();
        $ad1->setTitle('Guitar');
        $ad1->setCreatedAt(new \DateTime());
        $ad1->setDescription("Nocere sensim ducunt ad domesticus accentor. Neuter fermium tandem desideriums devirginato est.");
        $ad1->setUser($bob);
        $ad1->setStatus(Ad::STATUS_ACTIVE);
        $ad1->setCategory($instrumentCategory);

        $ad2 = new Ad();
        $ad2->setTitle('Drum');
        $ad2->setCreatedAt(new \DateTime());
        $ad2->setDescription("Cum habitio tolerare, omnes abactores consumere magnum, regius orexises. Finis bassus epos est.");
        $ad2->setUser($bob);
        $ad2->setStatus(Ad::STATUS_ACTIVE);
        $ad2->setCategory($instrumentCategory);

        $ad3 = new Ad();
        $ad3->setTitle('Piano');
        $ad3->setCreatedAt(new \DateTime());
        $ad3->setDescription("Vae. Camerarius habena una acquireres mens est. Ire virtualiter ducunt ad primus spatii.");
        $ad3->setUser($bob);
        $ad3->setStatus(Ad::STATUS_ACTIVE);
        $ad3->setCategory($instrumentCategory);


        $manager->persist($ad1);
        $manager->persist($ad2);
        $manager->persist($ad3);

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
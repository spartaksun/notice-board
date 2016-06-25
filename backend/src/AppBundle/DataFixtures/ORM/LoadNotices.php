<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 5/30/16
 * Time: 7:59 PM
 */

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Notice;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadNotices  extends AbstractFixture implements OrderedFixtureInterface
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

        $alice = $manager->getRepository('AppBundle:User')
            ->findOneBy([
                'username' => 'alice'
            ]);

        $carCategory = $manager->getRepository('AppBundle:Category')
            ->findOneBy([
                'slug' => 'cars'
            ]);

        $ad1 = new Notice();
        $ad1->setTitle('Skoda A5');
        $ad1->setCreatedAt(new \DateTime());
        $ad1->setDescription("Toss each side of the pumpkin seeds with one quarter cup of caviar.");
        $ad1->setUser($bob)->setSecondHand(true);
        $ad1->setStatus(Notice::STATUS_ACTIVE);
        $ad1->setCategory($carCategory);
        $ad1->setDelivery(true);
        $ad1->setDeliveryDescription('Kiev, Europe');
        $ad1->setBargain(true);
        $ad1->setPrice(124.67);
        $ad1->setCurrency('USD');


        $ad2 = new Notice();
        $ad2->setTitle('BMW X5');
        $ad2->setCreatedAt(new \DateTime());
        $ad2->setDescription("Try mixing the ginger lassi pork butts with shredded vinegar and teriyaki, boilled.");
        $ad2->setUser($alice);
        $ad2->setStatus(Notice::STATUS_ACTIVE);
        $ad2->setCategory($carCategory);
        $ad2->setDelivery(true);
        $ad2->setDeliveryDescription('Kiev, Europe');
        $ad2->setBargain(true);
        $ad2->setPrice(124.67);
        $ad2->setCurrency('USD');

        $ad3 = new Notice();
        $ad3->setTitle('Nissan Note');
        $ad3->setCreatedAt(new \DateTime());
        $ad3->setDescription("Remember: squeezeed lobster tastes best when roasted in a bottle seasoned with vodka.");
        $ad3->setUser($bob)->setSecondHand(true);
        $ad3->setStatus(Notice::STATUS_ACTIVE);
        $ad3->setCategory($carCategory);
        $ad3->setDelivery(true);
        $ad3->setDeliveryDescription('Kiev, Europe');
        $ad3->setBargain(true);
        $ad3->setPrice(124.67);
        $ad3->setCurrency('USD');

        $manager->persist($ad1);
        $manager->persist($ad2);
        $manager->persist($ad3);

        $instrumentCategory = $manager->getRepository('AppBundle:Category')
            ->findOneBy([
                'slug' => 'music'
            ]);

        $ad1 = new Notice();
        $ad1->setTitle('Guitar');
        $ad1->setCreatedAt(new \DateTime());
        $ad1->setDescription("Nocere sensim ducunt ad domesticus accentor. Neuter fermium tandem desideriums devirginato est.");
        $ad1->setUser($alice)->setSecondHand(true);
        $ad1->setStatus(Notice::STATUS_ACTIVE);
        $ad1->setCategory($instrumentCategory);
        $ad1->setDelivery(true);
        $ad1->setDeliveryDescription('Kiev, Europe');
        $ad1->setBargain(true);
        $ad1->setPrice(124.67);
        $ad1->setCurrency('USD');

        $ad2 = new Notice();
        $ad2->setTitle('Drum');
        $ad2->setCreatedAt(new \DateTime());
        $ad2->setDescription("Cum habitio tolerare, omnes abactores consumere magnum, regius orexises. Finis bassus epos est.");
        $ad2->setUser($alice)->setSecondHand(false);
        $ad2->setStatus(Notice::STATUS_ACTIVE);
        $ad2->setCategory($instrumentCategory);
        $ad2->setDelivery(true);
        $ad2->setDeliveryDescription('Kiev, Europe');
        $ad2->setBargain(true);
        $ad2->setPrice(124.67);
        $ad2->setCurrency('USD');

        $ad3 = new Notice();
        $ad3->setTitle('Piano');
        $ad3->setCreatedAt(new \DateTime());
        $ad3->setDescription("Vae. Camerarius habena una acquireres mens est. Ire virtualiter ducunt ad primus spatii.");
        $ad3->setUser($bob)->setSecondHand(false);
        $ad3->setStatus(Notice::STATUS_ACTIVE);
        $ad3->setCategory($instrumentCategory);
        $ad3->setDelivery(true);
        $ad3->setDeliveryDescription('Kiev, Europe');
        $ad3->setBargain(true);
        $ad3->setPrice(124.67);
        $ad3->setCurrency('USD');


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
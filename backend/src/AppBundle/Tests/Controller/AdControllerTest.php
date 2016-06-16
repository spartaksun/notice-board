<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/16/16
 * Time: 9:35 PM
 */

namespace AppBundle\Tests\Controller;


use AppBundle\Tests\WebTestCaseAuthenticated;
use Symfony\Component\HttpKernel\Client;

class AdControllerTest extends WebTestCaseAuthenticated
{
    private $client;

    public function testListOfAdsNotAuthenticated()
    {
        $this->tryTestAds(self::createClient());
    }

    public function testListOfAdsAuthenticated()
    {
        $this->tryTestAds($this->createAuthenticatedClient('alice', 'password'));
    }

    public function testCreateAd()
    {
        $client = $this->createAuthenticatedClient('alice', 'password');
        $client->request('GET','/api/categories');

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);

        $categories = json_decode($content, true);
        $this->assertTrue(count($categories) > 0);

        $categoryId = $categories[0]['id'];
        $adValues = [
            'title' => 'Test title ' . rand(100, 10000),
            'description' => 'Test description',
            'price' => "5",
            'currency' => 'USD',
            'category' => $categoryId,
            'bargain' => true,
            'delivery' => true,
            'deliveryDescription' => 'Europe, CA, USA (2 weeks)'
        ];

        $client->request(
            'POST',
            '/api/ads',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            json_encode([
                'ad' => $adValues
            ])
        );

        $content = $client->getResponse()->getContent();
        $this->assertJson($content);
        $content = json_decode($content, true);


        $this->assertTrue($content['title'] == $adValues['title'] );
        $this->assertTrue($content['description'] == $adValues['description'] );
        $this->assertTrue($content['price'] == $adValues['price'] );
        $this->assertTrue($content['currency'] == $adValues['currency'] );
        $this->assertTrue($content['delivery_description'] == $adValues['deliveryDescription'] );
    }

    private function tryTestAds(Client $client)
    {
        $client->request(
            'GET',
            '/api/ads',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json')
        );
        $content = json_decode($client->getResponse()->getContent(), true);

        $this->assertJson($client->getResponse()->getContent());
        $this->assertTrue(is_array($content));

    }
}
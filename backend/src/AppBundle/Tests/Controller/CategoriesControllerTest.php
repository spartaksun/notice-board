<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/8/16
 * Time: 12:00 PM
 */

namespace AppBundle\Tests\Controller;


use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CategoriesControllerTest extends WebTestCase
{
    private $client;

    public function testGetUserAction()
    {
        $this->client = static::createClient();
        $this->client->request(
            'GET',
            '/api/categories',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json')
        );
        $this->assertJson($this->client->getResponse()->getContent());
    }
}
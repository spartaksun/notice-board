<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/8/16
 * Time: 11:16 AM
 */

namespace AppBundle\Tests\Controller;


use AppBundle\Tests\WebTestCaseAuthenticated;

class UsersControllerTest extends WebTestCaseAuthenticated
{
    private $client;
    private static $username;
    private static $email;
    private static $password;
    private static $userId;


    public static function setUpBeforeClass()
    {
        self::$username = substr(md5(microtime(true)), 0, 10);
        self::$email = self::$username . '@mail.com';
        self::$password = '1234';
    }

    public function testCreateUserAction()
    {
        $this->client = static::createClient();

        $this->client->request(
            'POST',
            '/api/users',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{ "user": { "username": "' . self::$username . '", "email": "' . self::$email . '","plainPassword": "' . self::$password . '" } }'
        );
        $content = json_decode($this->client->getResponse()->getContent(), true);

        $this->assertJson($this->client->getResponse()->getContent());
        
        $this->assertFalse(empty($content['username']));
        $this->assertFalse(empty($content['email']));
        $this->assertFalse(empty($content['id']));
        
        $this->assertEquals(self::$username, $content['username']);
        $this->assertEquals(self::$email, $content['email']);
        
        self::$userId = $content['id'];
    }

    public function testCreateUserWithBadParameters()
    {
        $this->client = static::createClient();
        $this->client->request(
            'POST',
            '/api/users',
            array(),
            array(),
            array('CONTENT_TYPE' => 'application/json'),
            '{"qqq":"test fail'
        );
        $this->assertEquals(400, $this->client->getResponse()->getStatusCode());
    }
    
    public function testLogin()
    {
        $client = $this->createAuthenticatedClient(self::$username, self::$password);
        $client->request('GET',
            '/api/users/' . self::$userId);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}
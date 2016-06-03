<?php

namespace AppBundle\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

/**
 * Class JWTCreatedListener
 * @package AppBundle\EventListener
 */
class JWTCreatedListener
{
    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        if (!($request = $event->getRequest())) {
            return;
        }

        $payload       = $event->getData();
        $payload['ip'] = $request->getClientIp();

        $event->setData($payload);
    }
}

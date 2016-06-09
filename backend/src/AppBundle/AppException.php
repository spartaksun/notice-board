<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/9/16
 * Time: 12:24 AM
 */

namespace AppBundle;


use Symfony\Component\Form\FormErrorIterator;

class AppException extends \Exception
{
    private $formErrors = [];

    /**
     * @return array| FormErrorIterator
     */
    public function getFormErrors()
    {
        return $this->formErrors;
    }

    /**
     * @param array|FormErrorIterator $formErrors
     */
    public function setFormErrors($formErrors)
    {
        $this->formErrors = $formErrors;
    }


}
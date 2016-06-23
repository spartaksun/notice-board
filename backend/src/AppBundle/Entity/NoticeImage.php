<?php
/**
 * Created by A.Belyakovskiy.
 * Date: 6/21/16
 * Time: 11:22 PM
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Notice image
 *
 * @ORM\Entity()
 */
class NoticeImage
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $fileKey;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $format;

    /**
     * @var Notice
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Notice", inversedBy="images")
     */
    private $notice;


    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getFileKey()
    {
        return $this->fileKey;
    }

    /**
     * @param mixed $fileKey
     */
    public function setFileKey($fileKey)
    {
        $this->fileKey = $fileKey;
    }

    /**
     * @return Notice
     */
    public function getNotice()
    {
        return $this->notice;
    }

    /**
     * @param Notice $notice
     */
    public function setNotice($notice)
    {
        $this->notice = $notice;
    }

    /**
     * @return mixed
     */
    public function getFormat()
    {
        return $this->format;
    }

    /**
     * @param mixed $format
     */
    public function setFormat($format)
    {
        $this->format = $format;
    }
    
}
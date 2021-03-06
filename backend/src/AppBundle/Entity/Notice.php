<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Notice
 *
 * @ORM\Table(name="notice")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\NoticeRepository")
 */
class Notice
{
    const STATUS_ACTIVE = 1;
    
    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @var boolean
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $secondHand;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @var Category
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Category")
     */
    private $category;

    /**
     * @var NoticeImage[]
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\NoticeImage", mappedBy="notice")
     */
    private $images;

    /**
     * @var string
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     */
    private $user;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     */
    private $status;

    /**
     * @var boolean
     * @ORM\Column(type="boolean")
     */
    private $bargain;

    /**
     * @var float
     * @ORM\Column(type="decimal", scale=2)
     */
    private $price;

    /**
     * @var string
     * @ORM\Column(type="string", length=255)
     */
    private $currency;

    /**
     * @var boolean
     * @ORM\Column(type="boolean")
     */
    private $delivery;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $deliveryDescription;


    public function __construct()
    {
        $this->images = new ArrayCollection();
    }
    
    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Notice
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Notice
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set category
     *
     * @param Category $category
     *
     * @return Notice
     */
    public function setCategory(Category $category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return string
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set user
     *
     * @param User $user
     *
     * @return Notice
     */
    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return string
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Notice
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Notice
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return Notice
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @return boolean
     */
    public function isBargain()
    {
        return $this->bargain;
    }

    /**
     * @param boolean $bargain
     */
    public function setBargain($bargain)
    {
        $this->bargain = $bargain;
    }

    /**
     * @return float
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @param float $price
     */
    public function setPrice($price)
    {
        $this->price = $price;
    }

    /**
     * @return string
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * @param string $currency
     */
    public function setCurrency($currency)
    {
        $this->currency = $currency;
    }

    /**
     * @return boolean
     */
    public function isDelivery()
    {
        return $this->delivery;
    }

    /**
     * @param boolean $delivery
     */
    public function setDelivery($delivery)
    {
        $this->delivery = $delivery;
    }

    /**
     * @return string
     */
    public function getDeliveryDescription()
    {
        return $this->deliveryDescription;
    }

    /**
     * @param string $deliveryDescription
     */
    public function setDeliveryDescription($deliveryDescription)
    {
        $this->deliveryDescription = $deliveryDescription;
    }

    /**
     * @return ArrayCollection
     */
    public function getImages()
    {
        return $this->images;
    }

    /**
     * @param NoticeImage[] $images
     */
    public function setImages($images)
    {
        $this->images = $images;
    }

    /**
     * @return boolean
     */
    public function isSecondHand()
    {
        return $this->secondHand;
    }

    /**
     * @param boolean $new
     */
    public function setSecondHand($new)
    {
        $this->secondHand = $new;
    }
}


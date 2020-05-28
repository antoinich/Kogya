<?php

namespace App\DataFixtures;

use App\Entity\NatureActor;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;

class ActorFixtures extends Fixture
{
    /**
     * @var Generator
     */
    private $faker;

    public function load(ObjectManager $manager)
    {
        
        for ($i = 0; $i < 30; $i++) {
            $this->faker = Factory::create();
            $actor = new NatureActor();

            $actor->setName($this->faker->company);
            $actor->setType('association');
            $actor->setDescription('blalblalbalbalbla');
            $actor->setLat($this->faker->latitude(41.295102, 51.323262));
            $actor->setLongitude($this->faker->longitude(-5.768776, 9.857907));
            $actor->setUpdatedAt(new \DateTime(sprintf('-%d days', rand(1, 100))));
            $manager->persist($actor);
        }



        $manager->flush();
    }
}

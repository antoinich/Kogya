<?php

namespace App\Controller;

use App\Entity\NatureActor;
use App\Repository\NatureActorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MapController extends AbstractController
{
    /**
     * @Route("/map", name="map")
     */
    public function show(NatureActorRepository $repository)
    {
        $natureActors = $repository->findAll();

        return $this->render('map/index.html.twig', [
            'actors' => $natureActors,
        ]);
    }
}

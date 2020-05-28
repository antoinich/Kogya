<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class GogoController extends AbstractController
{
    /**
     * @Route("/gogo", name="gogo")
     */
    public function index()
    {
        return $this->render('gogo/index.html.twig', [
            'controller_name' => 'GogoController',
        ]);
    }
}

<?php

namespace Drupal\drupalizeme\Controller;

use Drupal\Core\Controller\ControllerBase;

class HelloController extends ControllerBase {
  public function content() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Hello world'),
    ];
  }
}

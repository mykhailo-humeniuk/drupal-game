<?php

namespace Drupal\fortnite\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines a Fortnite weapon plugin item annotation object.
 *
 * @see \Drupal\fortnite\Plugin\FnWeaponPluginManager
 * @see plugin_api
 *
 * @Annotation
 */
class FnWeaponPlugin extends Plugin {


  /**
   * The plugin ID.
   *
   * @var string
   */
  public $id;

  /**
   * The label of the plugin.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $label;

}

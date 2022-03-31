<?php

namespace Drupal\items\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines a Items weapon item annotation object.
 *
 * @see \Drupal\items\Plugin\ItemsWeaponManager
 * @see plugin_api
 *
 * @Annotation
 */
class ItemsWeapon extends Plugin {


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

  /**
   * The weapon's damage.
   *
   *
   * @var int
   */
  public $damage;

}

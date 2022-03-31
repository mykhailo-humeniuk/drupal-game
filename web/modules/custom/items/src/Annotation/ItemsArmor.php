<?php

namespace Drupal\items\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines a Items armor item annotation object.
 *
 * @see \Drupal\items\Plugin\ItemsArmorManager
 * @see plugin_api
 *
 * @Annotation
 */
class ItemsArmor extends Plugin {


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

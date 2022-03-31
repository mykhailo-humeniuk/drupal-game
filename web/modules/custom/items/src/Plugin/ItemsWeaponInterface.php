<?php

namespace Drupal\items\Plugin;

use Drupal\Component\Plugin\PluginInspectionInterface;

/**
 * Defines an interface for Items weapon plugins.
 */
interface ItemsWeaponInterface extends PluginInspectionInterface {

  /**
   * Provide the weapon's damage.
   *
   * @return int
   *  An integer with damage number.
   */
  public function damage(): int;

  /**
   * Perform weapons' action.
   *
   * @return mixed
   */
  public function fire();

  /**
   * Return label of the plugin.
   *
   * @return string
   */
  public function label(): string;
}

<?php

namespace Drupal\items\Plugin;

use Drupal\Component\Plugin\PluginBase;

/**
 * Base class for Items weapon plugins.
 */
abstract class ItemsWeaponBase extends PluginBase implements ItemsWeaponInterface {

  /**
   * @inheritdoc
   */
  public function damage(): int {
    return $this->pluginDefinition['damage'];
  }

  /**
   * @inheritdoc
   */
  public function fire() {
    // TODO: Implement fire() method.
  }

  /**
   * @inheritdoc
   */
  public function label(): string {
    return $this->pluginDefinition['label'];
  }

}

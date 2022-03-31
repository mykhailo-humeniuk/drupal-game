<?php

namespace Drupal\items\Plugin;

use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;

/**
 * Provides the Items armor plugin manager.
 */
class ItemsArmorManager extends DefaultPluginManager {


  /**
   * Constructs a new ItemsArmorManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct('Plugin/ItemsArmor', $namespaces, $module_handler, 'Drupal\items\Plugin\ItemsArmorInterface', 'Drupal\items\Annotation\ItemsArmor');

    $this->alterInfo('items_items_armor_info');
    $this->setCacheBackend($cache_backend, 'items_items_armor_plugins');
  }

}

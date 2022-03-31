<?php

namespace Drupal\fortnite\Plugin;

use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;

/**
 * Provides the Fortnite weapon plugin plugin manager.
 */
class FnWeaponPluginManager extends DefaultPluginManager {


  /**
   * Constructs a new FnWeaponPluginManager object.
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
    parent::__construct('Plugin/FnWeaponPlugin', $namespaces, $module_handler, 'Drupal\fortnite\Plugin\FnWeaponPluginInterface', 'Drupal\fortnite\Annotation\FnWeaponPlugin');

    $this->alterInfo('fortnite_fn_weapon_plugin_info');
    $this->setCacheBackend($cache_backend, 'fortnite_fn_weapon_plugin_plugins');
  }

}

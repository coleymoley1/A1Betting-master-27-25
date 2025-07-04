import React from 'react.ts';
import { Link, useLocation } from 'react-router-dom.ts';
import { clsx } from 'clsx.ts';
import { HomeIcon, ChartBarIcon, LightBulbIcon, Cog6ToothIcon } from '@heroicons/react/24/outline.ts';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Predictions', href: '/predictions', icon: LightBulbIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col" key={235198}>
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 pb-4" key={844555}>
        <div className="flex h-16 shrink-0 items-center" key={636292}>
          <img alt="BetPro AI" className="h-8 w-auto" src="/logo.svg" / key={276885}>
        </div>
        <nav className="flex flex-1 flex-col" key={989234}>
          <ul className="flex flex-1 flex-col gap-y-7" role="list" key={973142}>
            <li key={377233}>
              <ul className="-mx-2 space-y-1" role="list" key={921482}>
                {navigation.map(item => (
                  <li key={item.name} key={800056}>
                    <Link;
                      className={clsx(
                        location.pathname === item.href;
                          ? 'bg-gray-50 dark:bg-gray-700 text-brand-600 dark:text-brand-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-700',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                      to={item.href}
                     key={677666}>
                      <item.icon;
                        aria-hidden="true"
                        className={clsx(
                          location.pathname === item.href;
                            ? 'text-brand-600 dark:text-brand-400'
                            : 'text-gray-400 dark:text-gray-500 group-hover:text-brand-600 dark:group-hover:text-brand-400',
                          'h-6 w-6 shrink-0'
                        )}
                      / key={929310}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

import type React from "react";
import { Fragment } from "react";

import { Mono } from "@components/generic/Mono";
import { Tab } from "@headlessui/react";

export interface TabType {
  name: string;
  icon?: JSX.Element;
  element: () => JSX.Element;
  disabled?: boolean;
  disabledMessage?: string;
  disabledLink?: string;
}

export interface TabbedContentProps {
  tabs: TabType[];
  actions?: (() => JSX.Element)[];
}

export const TabbedContent = ({
  tabs,
  actions
}: TabbedContentProps): JSX.Element => {
  return (
    <Tab.Group as="div" className="flex flex-grow flex-col gap-2">
      <Tab.List className="flex bg-backgroundPrimary">
        {tabs.map((entry, index) => (
          <Tab key={index} disabled={entry.disabled}>
            {({ selected }) => (
              <div
                className={`flex h-10 gap-3 truncate border-b-2 px-3 text-sm font-medium ${
                  selected
                    ? "border-accent text-textPrimary"
                    : "border-backgroundPrimary text-textSecondary hover:text-textPrimary"
                } ${
                  entry.disabled
                    ? "cursor-not-allowed hover:text-textSecondary"
                    : "cursor-pointer"
                }
                   `}
              >
                {entry.icon && (
                  <div className="text-slate-500 m-auto">{entry.icon}</div>
                )}
                <span className="m-auto">{entry.name}</span>
              </div>
            )}
          </Tab>
        ))}
        <div className="ml-auto flex gap-2">
          {actions?.map((Action, index) => (
            <Action key={index} />
          ))}
        </div>
      </Tab.List>
      <Tab.Panels as={Fragment}>
        {tabs.map((entry, index) => (
          <Tab.Panel key={index} className="flex flex-grow">
            {!entry.disabled ? (
              <entry.element />
            ) : (
              <div>
                <Mono>
                  {entry.disabledMessage || "This tab is disabled"}.{" "}
                  {entry.disabledLink && (
                    <>
                      Click{" "}
                      <a
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                        href={entry.disabledLink}
                      >
                        here
                      </a>{" "}
                      for more information.
                    </>
                  )}
                </Mono>
              </div>
            )}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
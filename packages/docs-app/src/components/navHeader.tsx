/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { INpmPackage } from "@documentalist/client";
import React from "react";

import { Classes, HotkeysTarget, Menu, MenuItem, NavbarHeading, Tag } from "@blueprintjs/core";
import { NavButton } from "@blueprintjs/docs-theme";
import { Popover2 } from "@blueprintjs/popover2";

import { Logo } from "./logo";

export interface NavHeaderProps {
    onToggleDark: (useDark: boolean) => void;
    useDarkTheme: boolean;
    useNextVersion: boolean;
    packageData: INpmPackage;
}

export class NavHeader extends React.PureComponent<NavHeaderProps> {
    public render() {
        const { useDarkTheme } = this.props;
        return (
            <HotkeysTarget
                hotkeys={[
                    {
                        combo: "shift + d",
                        global: true,
                        label: "Toggle dark theme",
                        onKeyDown: this.handleDarkSwitchChange,
                    },
                ]}
            >
                <>
                    <div className="docs-nav-title">
                        <a className="docs-logo" href="/">
                            <Logo />
                        </a>
                        <div>
                            <NavbarHeading className="docs-heading">
                                <span>Blueprint</span> {this.renderVersionsMenu()}
                            </NavbarHeading>
                            <a
                                className={Classes.TEXT_MUTED}
                                href="https://github.com/palantir/blueprint"
                                target="_blank"
                            >
                                <small>View on GitHub</small>
                            </a>
                        </div>
                    </div>
                    <div className="docs-nav-divider" />
                    <NavButton
                        icon={useDarkTheme ? "flash" : "moon"}
                        hotkey="shift + d"
                        text={useDarkTheme ? "Light theme" : "Dark theme"}
                        onClick={this.handleDarkSwitchChange}
                    />
                </>
            </HotkeysTarget>
        );
    }

    private renderVersionsMenu() {
        const { version, nextVersion, versions } = this.props.packageData;
        if (versions.length === 1) {
            return <div className={Classes.TEXT_MUTED}>v{versions[0]}</div>;
        }

        // default to latest release if we can't find a major version in the URL
        const [current] = /\/versions\/([0-9]+)/.exec(location.href) || [
            this.props.useNextVersion ? nextVersion : version,
        ];
        const releaseItems = versions
            .filter(v => +major(v) > 0)
            .map(v => <MenuItem href={v === current ? "/docs" : `/docs/versions/${major(v)}`} key={v} text={v} />);
        return (
            <Popover2 content={<Menu className="docs-version-list">{releaseItems}</Menu>} placement="bottom">
                <Tag interactive={true} minimal={true} round={true} rightIcon="caret-down">
                    v{major(current)}
                </Tag>
            </Popover2>
        );
    }

    private handleDarkSwitchChange = () => this.props.onToggleDark(!this.props.useDarkTheme);
}

/** Get major component of semver string. */
function major(version: string) {
    return version.split(".", 1)[0];
}

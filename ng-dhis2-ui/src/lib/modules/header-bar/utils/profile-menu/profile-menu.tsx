import { Card } from '@dhis2-ui/card'
import { Center } from '@dhis2-ui/center'
import { Divider } from '@dhis2-ui/divider'
import { Layer } from '@dhis2-ui/layer'
import { CircularLoader } from '@dhis2-ui/loader'
import { MenuDivider, MenuItem } from '@dhis2-ui/menu'
import { clearSensitiveCaches, useConfig } from '@dhis2/app-runtime'
import { colors } from '@dhis2/ui-constants'
import {
    IconSettings24,
    IconInfo24,
    IconLogOut24,
    IconUser24,
    IconQuestion24,
} from '@dhis2/ui-icons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { DebugInfoMenuItem } from '../debug-info/debug-info-menu-item'
import { joinPath } from '../join-path'
import i18n from '@dhis2/d2-i18n';
import { ProfileHeader } from './profile-header'
import { UpdateNotification } from './update-notification'

const LoadingMask = () => (
    <Layer
        translucent
        disablePortal
        dataTest="headerbar-profile-menu-loading-mask"
    >
        <Center>
            <CircularLoader />
        </Center>
    </Layer>
)

const ProfileContents = (params: any) => {
    const {
        name,
        email,
        avatarId,
        helpUrl,
        hideProfileMenu,
        showDebugInfoModal,
    } = params;
    const { baseUrl } = useConfig()
    const [loading, setLoading] = useState(false)

    return (
        <Card>
            <div className="headerbar-profile-contents">
                <ProfileHeader name={name} email={email} avatarId={avatarId} />
                <Divider margin="13px 0 7px 0" />
                <ul data-test="headerbar-profile-menu">
                    <MenuItem
                        href={joinPath(
                            baseUrl,
                            'dhis-web-user-profile/#/settings'
                        )}
                        label={i18n.t('Settings')}
                        value="settings"
                        icon={<IconSettings24 color={colors.grey700} />}
                    />
                    <MenuItem
                        href={joinPath(
                            baseUrl,
                            'dhis-web-user-profile/#/account'
                        )}
                        label={i18n.t('Account')}
                        value="account"
                        icon={<IconUser24 color={colors.grey700} />}
                    />
                    {helpUrl && (
                        <MenuItem
                            href={helpUrl}
                            label={i18n.t('Help')}
                            value="help"
                            icon={<IconQuestion24 color={colors.grey700} />}
                        />
                    )}
                    <MenuItem
                        href={joinPath(
                            baseUrl,
                            'dhis-web-user-profile/#/aboutPage'
                        )}
                        label={i18n.t('About DHIS2')}
                        value="about"
                        icon={<IconInfo24 color={colors.grey700} />}
                    />
                    <MenuItem
                        href={joinPath(
                            baseUrl,
                            'dhis-web-commons-security/logout.action'
                        )}
                        // NB: By MenuItem implementation, this callback
                        // overwrites default navigation behavior but maintains
                        // the href attribute
                        onClick={async () => {
                            setLoading(true)
                            await clearSensitiveCaches()
                            setLoading(false)
                            window.location.assign(
                                joinPath(
                                    baseUrl,
                                    'dhis-web-commons-security/logout.action'
                                )
                            )
                        }}
                        label={i18n.t('Logout')}
                        value="logout"
                        icon={<IconLogOut24 color={colors.grey700} />}
                    />
                    <MenuDivider dense />
                    <DebugInfoMenuItem
                        hideProfileMenu={hideProfileMenu}
                        showDebugInfoModal={showDebugInfoModal}
                    />
                    <UpdateNotification hideProfileMenu={hideProfileMenu} />
                </ul>
            </div>

            {loading && <LoadingMask />}

            <style jsx>{`
                .headerbar-profile-contents {
                    width: 100%;
                    padding: 0;
                }

                .headerbar-profile-contents ul {
                    padding: 0;
                    margin: 0;
                }

                .headerbar-profile-contents a {
                    display: inline-flex !important;
                }

               .headerbar-profile-contents a,
               .headerbar-profile-contents a:hover,
               .headerbar-profile-contents a:focus,
               .headerbar-profile-contents a:active,
               .headerbar-profile-contents a:visited {
                    text-decoration: none;
                    display: block;
                }
            `}</style>
        </Card>
    )
}

ProfileContents.propTypes = {
    hideProfileMenu: PropTypes.func.isRequired,
    showDebugInfoModal: PropTypes.func.isRequired,
    avatarId: PropTypes.string,
    email: PropTypes.string,
    helpUrl: PropTypes.string,
    name: PropTypes.string,
}

export const ProfileMenu = (params: any) => {
    const { ...props }=params;
    return (
        <div className="headerbar-profile-menu" data-test="headerbar-profile-menu">
            <ProfileContents {...props} />
            <style jsx>{`
                .headerbar-profile-menu {
                    z-index: 10000;
                    position: absolute;
                    right: 4px;
                    width: 320px;
                }
            `}</style>
        </div>
    )
}

ProfileMenu.propTypes = {
    hideProfileMenu: PropTypes.func.isRequired,
    showDebugInfoModal: PropTypes.func.isRequired,
    avatarId: PropTypes.string,
    email: PropTypes.string,
    helpUrl: PropTypes.string,
    name: PropTypes.string,
}

/**
 * @name RoleDetails
 * @version 1.0.0
 * @description Allows you to easily see all the details of a role and be able to copy them
 * @authorId 553139953597677568
 * @invite xfvHwqXXKs
 * @authorLink https://instagram.com/ehsndvr
 * @website https://www.beheshtmarket.com
 * @source https://github.com/iamehsandvr/RoleDetails.plugin/blob/e1c918f8107dd9c59a853a7f7421f9a493073c3b/RoleDetails.plugin.js
 * @updateUrl https://github.com/iamehsandvr/RoleDetails.plugin/blob/e1c918f8107dd9c59a853a7f7421f9a493073c3b/RoleDetails.plugin.js
*/
const config = {
    info: {
        name: "RoleDetails",
        authors: [
            {
                name: "EhsanDavari"
            }
        ],
        version: "1.0.0",
        description: "Allows you to easily see all the details of a role and be able to copy them",
    },
};

module.exports = !global.ZeresPluginLibrary ? class {
    constructor() { this._config = config; }
    getName() { return config.info.name; }
    getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
    getDescription() { return config.info.description; }
    getVersion() { return config.info.version; }
    load() {
        BdApi.showConfirmationModal("Library plugin is needed",
            `The library plugin needed for AQWERT'sPluginBuilder is missing. Please click Download Now to install it.`, {
            confirmText: "Download",
            cancelText: "Cancel",
            onConfirm: () => {
                require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                    if (error)
                        return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");

                    require("fs").writeFileSync(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                });
            }
        });
    }

    start() { }

    stop() { }
} : (([Plugin, Library]) => {
    const { DiscordModules, Patcher, DiscordContextMenu, Toasts, Modals, WebpackModules } = Library;
    const { ElectronModule, React, Strings } = DiscordModules;
    const MemberRole = WebpackModules.getByProps('MemberRole').MemberRole;

    class plugin extends Plugin {
        constructor() {
            super();
        }


        onStart() {
            this.getDetails();
        }

        onStop() {
            Patcher.unpatchAll();
        }
        getHexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        showDetailsPannel(props) {
            const { FormItem } = BdApi.findModuleByProps("FormItem");
            const HexToRgb = (props.role.colorString === null) ? this.getHexToRgb("#B9BBBE") : this.getHexToRgb(props.role.colorString);
            const DiscordPerms = Object.assign({}, DiscordModules.DiscordConstants.Permissions);
            var PermissionsData = [];
            const perms = props.role.permissions;
            for (const perm in DiscordPerms) {
                const permName = Strings[perm] || perm.split("_").map(n => n[0].toUpperCase() + n.slice(1).toLowerCase()).join(" ");
                const hasPerm = (perms & DiscordPerms[perm]) == DiscordPerms[perm];
                if (hasPerm) {
                    PermissionsData.push(BdApi.React.createElement("li", {
                        className: "role-2irmRk flex-1O1GKY alignCenter-1dQNNs tag-wWVHyf memberTag-QVWzGc roleStyle-jQ7KI2",
                        style: {
                            borderColor: "rgba(226, 101, 0, 0.6);",
                            color: "white",
                            margin: '0.5rem'
                        },
                        children: [
                            BdApi.React.createElement("div", {
                                style: {
                                    backgroundColor: `rgb(${HexToRgb.r}, ${HexToRgb.g}, ${HexToRgb.b})`
                                },
                                className: "roleCircle-3xAZ1j flex-1O1GKY alignCenter-1dQNNs justifyCenter-3D2jYp desaturateUserColors-1gar-1",
                            }),
                            BdApi.React.createElement("div", {
                                className: "roleName-32vpEy",
                                children: [
                                    permName,
                                ],
                            }),
                        ],
                    }))
                }
            }
            const permAllowedIcon = BdApi.React.createElement("p", {
                style: {
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "1.5em",
                    padding: 0,
                    margin: 0
                },
                children: [
                    "✔"
                ]
            });
            const permDeniedIcon = BdApi.React.createElement("p", {
                style: {
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "2em",
                    padding: 0,
                    margin: 0
                },
                children: [
                    "×"
                ]
            });
            let blank = BdApi.React.createElement(FormItem, { title: " " }),
                RoleName = BdApi.React.createElement("li", {
                    className: "role-2irmRk flex-1O1GKY alignCenter-1dQNNs tag-wWVHyf memberTag-QVWzGc roleStyle-jQ7KI2",
                    style: {
                        borderColor: "rgba(226, 101, 0, 0.6);",
                        color: "white",
                        margin: '0.5rem'
                    },
                    children: [
                        BdApi.React.createElement("div", {
                            style: {
                                backgroundColor: `rgb(${HexToRgb.r}, ${HexToRgb.g}, ${HexToRgb.b})`
                            },
                            className: "roleCircle-3xAZ1j flex-1O1GKY alignCenter-1dQNNs justifyCenter-3D2jYp desaturateUserColors-1gar-1",
                            onClick: (_) => {
                                ElectronModule.copy(`#${props.role.colorString}`);
                                Toasts.success(`Successfully copied role color`)
                            }
                        }),
                        props.role.icon === null ? null : BdApi.React.createElement("img", {
                            className: "roleIcon-1_1CJy roleIcon-228VjM",
                            src: `https://cdn.discordapp.com/role-icons/${props.role.id}/${props.role.icon}.png?size=16`,
                            onClick: (_) => {
                                ElectronModule.copy(`https://cdn.discordapp.com/role-icons/${props.role.id}/${props.role.icon}.png?size=4096`);
                                Toasts.success(`Successfully copied role icon`)
                            }
                        }),
                        BdApi.React.createElement("div", {
                            className: "roleName-32vpEy",
                            children: [
                                props.role.name,
                            ],
                            onClick: (_) => {
                                ElectronModule.copy(props.role.id);
                                Toasts.success(`Successfully copied role name`)
                            }
                        }),
                    ],
                }),
                RoleID = BdApi.React.createElement(FormItem, {
                    title: "Role ID",
                    children: [
                        BdApi.React.createElement("strong", {
                            style: {
                                color: "white",
                                cursor: "pointer",
                                marginDown: '1.5rem'
                            },
                            children: [
                                props.role.id,
                            ],
                            onClick: (_) => {
                                ElectronModule.copy(props.role.id);
                                Toasts.success(`Successfully copied role id`)
                            }
                        }),
                        "\n"
                    ]
                }),
                RoleColor = BdApi.React.createElement(FormItem, {
                    title: "Role Color",
                    children: [
                        BdApi.React.createElement("div", {
                            style: {
                                color: "white",
                                marginDown: '1.5rem'

                            },
                            children: [
                                BdApi.React.createElement("strong", {
                                    children: [
                                        `Color Code : ${props.role.color}`,
                                        BdApi.React.createElement("div", {
                                            style: {
                                                color: props.role.colorString === null ? "white" : props.role.colorString,
                                                cursor: "pointer"
                                            },
                                            children: [
                                                props.role.colorString
                                            ],
                                            onClick: (_) => {
                                                ElectronModule.copy(props.role.colorString);
                                                Toasts.success(`Successfully copied role color`)
                                            }
                                        })
                                    ],
                                })
                            ]
                        }),
                    ]
                }),
                Mentionable = BdApi.React.createElement(FormItem, {
                    title: "Mentionable",
                    children: [
                        props.role.mentionable === true ?
                            permAllowedIcon
                            :
                            permDeniedIcon
                    ]
                }),
                Hoist = BdApi.React.createElement(FormItem, {
                    title: "Hoist",
                    children: [
                        props.role.hoist === true ?
                            permAllowedIcon
                            :
                            permDeniedIcon
                    ]
                }),
                Managed = BdApi.React.createElement(FormItem, {
                    title: "Managed",
                    children: [
                        props.role.managed === true ?
                            permAllowedIcon
                            :
                            permDeniedIcon
                    ]
                }),
                Permissions = BdApi.React.createElement(FormItem, {
                    title: "Permissions",
                    children: PermissionsData
                });
            Modals.showModal("Role detail", [RoleName, RoleID, RoleColor, Mentionable, Hoist, Managed, Permissions, blank], {
                confirmText: "OK",
            });
        }
        getDetails() {
            Patcher.after(MemberRole, 'render', (_, [props], ret) => {
                const newContextMenu = DiscordContextMenu.buildMenu([
                    {
                        label: 'View role details',
                        action: _ => {
                            return this.showDetailsPannel(props)
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: Strings.COPY_ID,
                        action: _ => {
                            ElectronModule.copy(props.role.id);
                        }
                    }
                ]);
                ret.props.children.props.onContextMenu = e => {
                    DiscordContextMenu.openContextMenu(e, newContextMenu)
                }
            });
        }

    }
    return plugin;
})(global.ZeresPluginLibrary.buildPlugin(config));

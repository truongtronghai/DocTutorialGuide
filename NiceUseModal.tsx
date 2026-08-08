// Nice way to use Modal by using its hook instead of component and remove central storageKey in Localstorage. Amazing approach
const [modal, contextHolder] = Modal.useModal();

    const showLoggedOutModal = (
        title: string,
        content: string,
        storageKey: string
    ) => {
        modal.confirm({
            title,
            content,
            icon: <ExclamationCircleOutlined />,
            okText: "OK",
            onOk: () => {
                localStorage.removeItem(storageKey);
                Modal.destroyAll();
            },
            destroyOnClose: true,
            footer: (_, { OkBtn }) => <OkBtn />,
        });
    };

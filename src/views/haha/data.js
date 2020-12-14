export default {
  id: 10,
  content: {
    idModule: {
      PagesForm1567754256662: {
        title: '演示页面-客服人力配置编辑',
        type: 'PagesForm',
        action: ['submit', 'back'],
        apiUrl: '',
        envApi: {},
        id: 'PagesForm1567754256662',
        saveApiUrl: 'testIM/save'
      },
      TimePick1567754268816: {
        label: '选择时间',
        type: 'TimePick',
        value: '',
        selectableRange: [],
        isRange: true,
        valueFormat: 'HH:mm:ss',
        validator: {
          message: {
            required: '该字段必填'
          },
          params: {
            phoneNumber: 'mobile',
            web: 'https',
            maxLength: 20,
            minLength: 4
          },
          checked: [],
          rules: []
        },
        id: 'TimePick1567754268816',
        key: 'date'
      },
      InputNumber1567754290799: {
        label: '排班客服人限',
        type: 'InputNumber',
        value: 0,
        placeholder: '',
        controls: false,
        precision: 0,
        min: 0,
        max: 9999,
        step: 1,
        validator: {
          message: {
            required: '该字段必填'
          },
          params: {
            phoneNumber: 'mobile',
            web: 'https',
            maxLength: 20,
            minLength: 4
          },
          checked: [],
          rules: []
        },
        id: 'InputNumber1567754290799',
        key: 'totalService'
      },
      InputNumber1567754303439: {
        label: '在线客服上限',
        type: 'InputNumber',
        value: 0,
        placeholder: '',
        controls: false,
        precision: 0,
        min: 0,
        max: 9999,
        step: 1,
        validator: {
          message: {
            required: '该字段必填'
          },
          params: {
            phoneNumber: 'mobile',
            web: 'https',
            maxLength: 20,
            minLength: 4
          },
          checked: [],
          rules: []
        },
        id: 'InputNumber1567754303439',
        key: 'onlineService'
      },
      InputNumber1567754304735: {
        label: '离线客服上限',
        type: 'InputNumber',
        value: 0,
        placeholder: '',
        controls: false,
        precision: 0,
        min: 0,
        max: 9999,
        step: 1,
        validator: {
          message: {
            required: '该字段必填'
          },
          params: {
            phoneNumber: 'mobile',
            web: 'https',
            maxLength: 20,
            minLength: 4
          },
          checked: [],
          rules: []
        },
        id: 'InputNumber1567754304735',
        key: 'offlineService'
      },
      InputNumber1567754304911: {
        label: '就餐客服上限',
        type: 'InputNumber',
        value: 0,
        placeholder: '',
        controls: false,
        precision: 0,
        min: 0,
        max: 9999,
        step: 1,
        validator: {
          message: {
            required: '该字段必填'
          },
          params: {
            phoneNumber: 'mobile',
            web: 'https',
            maxLength: 20,
            minLength: 4
          },
          checked: [],
          rules: []
        },
        id: 'InputNumber1567754304911',
        key: 'eatService'
      },
      InputNumber1567754305104: {
        label: '话后客服上限',
        type: 'InputNumber',
        value: 0,
        placeholder: '',
        controls: false,
        precision: 0,
        min: 0,
        max: 9999,
        step: 1,
        validator: {
          message: {
            required: '该字段必填'
          },
          params: {
            phoneNumber: 'mobile',
            web: 'https',
            maxLength: 20,
            minLength: 4
          },
          checked: [],
          rules: []
        },
        id: 'InputNumber1567754305104',
        key: 'afterService'
      },
      InputNumber1567754305295: {
        label: '会议客服上限',
        type: 'InputNumber',
        value: 0,
        placeholder: '',
        controls: false,
        precision: 0,
        min: 0,
        max: 9999,
        step: 1,
        validator: {
          message: {
            required: '该字段必填'
          },
          params: {
            phoneNumber: 'mobile',
            web: 'https',
            maxLength: 20,
            minLength: 4
          },
          checked: [],
          rules: []
        },
        id: 'InputNumber1567754305295',
        key: 'meetingService'
      },
      InputNumber1567754305496: {
        label: '小休客服上限',
        type: 'InputNumber',
        value: 0,
        placeholder: '',
        controls: false,
        precision: 0,
        min: 0,
        max: 9999,
        step: 1,
        validator: {
          message: {
            required: '该字段必填'
          },
          params: {
            phoneNumber: 'mobile',
            web: 'https',
            maxLength: 20,
            minLength: 4
          },
          checked: [],
          rules: []
        },
        id: 'InputNumber1567754305496',
        key: 'restService'
      },
      InputNumber1567754305670: {
        label: '培训客服上限',
        type: 'InputNumber',
        value: 0,
        placeholder: '',
        controls: false,
        precision: 0,
        min: 0,
        max: 9999,
        step: 1,
        validator: {
          message: {
            required: '该字段必填'
          },
          params: {
            phoneNumber: 'mobile',
            web: 'https',
            maxLength: 20,
            minLength: 4
          },
          checked: [],
          rules: []
        },
        id: 'InputNumber1567754305670',
        key: 'trainService'
      }
    },
    floorList: [
      'TimePick1567754268816',
      'InputNumber1567754290799',
      'InputNumber1567754303439',
      'SlotProductName',
      'InputNumber1567754304735',
      'InputNumber1567754304911',
      'InputNumber1567754305104',
      'SlotInputName',
      'InputNumber1567754305295',
      'InputNumber1567754305496',
      'InputNumber1567754305670'
    ],
    pagesModuleId: 'PagesForm1567754256662'
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_trip/lib/parse_color.dart';

enum ESearchBarType { home, normal, homeLight }

void none() {}

class SearchBar extends StatefulWidget {
  final bool enabled; // 是否禁止搜尋
  final bool? hideLeft; // 左邊按鈕是否隱藏
  final ESearchBarType searchBarType; // 樣式
  final String hint;
  final String? defaultText;
  final void Function() leftButtonClick;
  final void Function() rightButtonClick;
  final void Function() speakClick;
  final void Function() inputBoxClick;
  final ValueChanged<String>? onChanged;

  const SearchBar({
    Key? key,
    this.enabled = true,
    this.hideLeft = false,
    this.searchBarType = ESearchBarType.normal,
    this.hint = '',
    this.defaultText,
    this.leftButtonClick = none,
    this.rightButtonClick = none,
    this.speakClick = none,
    this.inputBoxClick = none,
    this.onChanged,
  }) : super(key: key);

  @override
  State<SearchBar> createState() => _SearchBarState();
}

class _SearchBarState extends State<SearchBar> {
  bool showClear = false;
  final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    if (widget.defaultText != null) {
      setState(() {
        _controller.text = widget.defaultText!;
      });
    }

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return widget.searchBarType == ESearchBarType.normal
        ? _genNormalSearch()
        : _genHomeSearch();
  }

  _wrapTap(Widget child, void Function() callback) {
    return GestureDetector(
      onTap: callback,
      child: child,
    );
  }

  _onChanged(String text) {
    if (text.isNotEmpty) {
      setState(() {
        showClear = true;
      });
    } else {
      setState(() {
        showClear = false;
      });
    }
    if (widget.onChanged != null) {
      widget.onChanged!(text);
    }
  }

  _inputBox() {
    Color inputBoxColor = widget.searchBarType == ESearchBarType.home
        ? Colors.white
        : parseColor('ffEDEDED');
    var isNormal = widget.searchBarType == ESearchBarType.normal;

    return Container(
      height: 30,
      padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
      decoration: BoxDecoration(
        color: inputBoxColor,
        borderRadius: BorderRadius.circular(isNormal ? 5 : 15),
      ),
      child: Row(
        children: [
          Icon(
            Icons.search,
            size: 20,
            color: isNormal ? const Color(0xffA9A9A9) : Colors.blue,
          ),
          Expanded(
            flex: 1,
            child: isNormal
                ? TextField(
                    controller: _controller,
                    onChanged: _onChanged,
                    autofocus: true,
                    style: const TextStyle(
                      fontSize: 18.0,
                      color: Colors.black,
                      fontWeight: FontWeight.w300,
                    ),
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: widget.hint,
                      hintStyle: const TextStyle(fontSize: 15),
                    ),
                  )
                : _wrapTap(
                    Text(
                      widget.defaultText ?? '',
                      style: const TextStyle(fontSize: 13, color: Colors.grey),
                    ),
                    widget.inputBoxClick,
                  ),
          ),
          showClear
              ? _wrapTap(
                  const Icon(
                    Icons.clear,
                    size: 22,
                    color: Colors.grey,
                  ), () {
                  setState(() {
                    _controller.clear();
                  });
                  _onChanged('');
                })
              : _wrapTap(
                  Icon(
                    Icons.mic,
                    size: 22,
                    color: isNormal ? Colors.blue : Colors.grey,
                  ),
                  widget.speakClick)
        ],
      ),
    );
  }

  Widget _genNormalSearch() {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.fromLTRB(6, 5, 10, 5),
          child: widget.hideLeft ?? false
              ? null
              : const Icon(
                  Icons.arrow_back_ios,
                  color: Colors.grey,
                  size: 26,
                ),
        ),
        Expanded(flex: 1, child: _inputBox()),
        _wrapTap(
          Container(
            padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
            child: const Text(
              '搜尋',
              style: TextStyle(color: Colors.blue, fontSize: 17),
            ),
          ),
          widget.rightButtonClick,
        ),
      ],
    );
  }

  Widget _genHomeSearch() {
    return Container();
  }
}
